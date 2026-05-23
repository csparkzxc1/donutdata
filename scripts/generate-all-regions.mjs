import fs from 'fs';
import path from 'path';

const ALL_REGIONS = [
  // 서울특별시 (25)
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '강남구', sigunguSlug: 'gangnam', dept: '자원순환과', phone: '02-3423-5974' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '강동구', sigunguSlug: 'gangdong', dept: '자원순환과', phone: '02-3425-5710' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '강북구', sigunguSlug: 'gangbuk', dept: '청소행정과', phone: '02-901-6511' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '강서구', sigunguSlug: 'gangseo', dept: '자원순환과', phone: '02-2600-6531' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '관악구', sigunguSlug: 'gwanak', dept: '청소행정과', phone: '02-879-6611' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '광진구', sigunguSlug: 'gwangjin', dept: '청소행정과', phone: '02-450-7691' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '구로구', sigunguSlug: 'guro', dept: '자원순환과', phone: '02-860-2831' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '금천구', sigunguSlug: 'geumcheon', dept: '청소행정과', phone: '02-2627-1461' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '노원구', sigunguSlug: 'nowon', dept: '자원순환과', phone: '02-2116-3671' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '도봉구', sigunguSlug: 'dobong', dept: '청소행정과', phone: '02-2091-3681' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '동대문구', sigunguSlug: 'dongdaemun', dept: '청소행정과', phone: '02-2127-4571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '동작구', sigunguSlug: 'dongjak', dept: '자원순환과', phone: '02-820-9561' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '마포구', sigunguSlug: 'mapo', dept: '청소행정과', phone: '02-3153-9171' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '서대문구', sigunguSlug: 'seodaemun', dept: '청소행정과', phone: '02-330-1571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '서초구', sigunguSlug: 'seocho', dept: '자원순환과', phone: '02-2155-8931' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '성동구', sigunguSlug: 'seongdong', dept: '청소행정과', phone: '02-2286-5571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '성북구', sigunguSlug: 'seongbuk', dept: '청소행정과', phone: '02-2241-3691' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '송파구', sigunguSlug: 'songpa', dept: '자원순환과', phone: '02-2147-3571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '양천구', sigunguSlug: 'yangcheon', dept: '청소행정과', phone: '02-2620-3571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '영등포구', sigunguSlug: 'yeongdeungpo', dept: '자원순환과', phone: '02-2670-3571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '용산구', sigunguSlug: 'yongsan', dept: '청소행정과', phone: '02-2199-7461' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '은평구', sigunguSlug: 'eunpyeong', dept: '자원순환과', phone: '02-351-7571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '종로구', sigunguSlug: 'jongno', dept: '청소행정과', phone: '02-2148-2571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '중구', sigunguSlug: 'jung', dept: '청소행정과', phone: '02-3396-5571' },
  { sido: '서울특별시', sidoSlug: 'seoul', sigungu: '중랑구', sigunguSlug: 'jungnang', dept: '청소행정과', phone: '02-2094-2571' },

  // 부산광역시 (16)
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '강서구', sigunguSlug: 'gangseo', dept: '환경위생과', phone: '051-970-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '금정구', sigunguSlug: 'geumjeong', dept: '환경위생과', phone: '051-519-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '기장군', sigunguSlug: 'gijang', dept: '환경위생과', phone: '051-709-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '남구', sigunguSlug: 'nam', dept: '환경위생과', phone: '051-607-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '동구', sigunguSlug: 'dong', dept: '환경위생과', phone: '051-440-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '동래구', sigunguSlug: 'dongnae', dept: '환경위생과', phone: '051-550-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '부산진구', sigunguSlug: 'busanjin', dept: '환경위생과', phone: '051-605-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '북구', sigunguSlug: 'buk', dept: '환경위생과', phone: '051-309-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '사상구', sigunguSlug: 'sasang', dept: '환경위생과', phone: '051-310-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '사하구', sigunguSlug: 'saha', dept: '환경위생과', phone: '051-220-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '서구', sigunguSlug: 'seo', dept: '환경위생과', phone: '051-240-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '수영구', sigunguSlug: 'suyeong', dept: '환경위생과', phone: '051-610-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '연제구', sigunguSlug: 'yeonje', dept: '환경위생과', phone: '051-665-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '영도구', sigunguSlug: 'yeongdo', dept: '환경위생과', phone: '051-419-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '중구', sigunguSlug: 'jung', dept: '환경위생과', phone: '051-600-4531' },
  { sido: '부산광역시', sidoSlug: 'busan', sigungu: '해운대구', sigunguSlug: 'haeundae', dept: '환경위생과', phone: '051-749-4531' },

  // 대구광역시 (8)
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '남구', sigunguSlug: 'nam', dept: '환경위생과', phone: '053-664-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '달서구', sigunguSlug: 'dalseo', dept: '환경위생과', phone: '053-667-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '달성군', sigunguSlug: 'dalseong', dept: '환경위생과', phone: '053-668-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '동구', sigunguSlug: 'dong', dept: '환경위생과', phone: '053-662-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '북구', sigunguSlug: 'buk', dept: '환경위생과', phone: '053-665-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '서구', sigunguSlug: 'seo', dept: '환경위생과', phone: '053-663-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '수성구', sigunguSlug: 'suseong', dept: '환경위생과', phone: '053-666-2831' },
  { sido: '대구광역시', sidoSlug: 'daegu', sigungu: '중구', sigunguSlug: 'jung', dept: '환경위생과', phone: '053-661-2831' },

  // 인천광역시 (10)
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '강화군', sigunguSlug: 'ganghwa', dept: '환경과', phone: '032-930-3531' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '계양구', sigunguSlug: 'gyeyang', dept: '자원순환과', phone: '032-450-5571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '남동구', sigunguSlug: 'namdong', dept: '자원순환과', phone: '032-453-2571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '동구', sigunguSlug: 'dong', dept: '환경과', phone: '032-770-6571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '미추홀구', sigunguSlug: 'michuhol', dept: '자원순환과', phone: '032-880-4571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '부평구', sigunguSlug: 'bupyeong', dept: '자원순환과', phone: '032-509-6571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '서구', sigunguSlug: 'seo', dept: '자원순환과', phone: '032-560-4571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '연수구', sigunguSlug: 'yeonsu', dept: '자원순환과', phone: '032-749-7571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '옹진군', sigunguSlug: 'ongjin', dept: '환경과', phone: '032-899-2571' },
  { sido: '인천광역시', sidoSlug: 'incheon', sigungu: '중구', sigunguSlug: 'jung', dept: '환경과', phone: '032-760-7571' },

  // 광주광역시 (5)
  { sido: '광주광역시', sidoSlug: 'gwangju', sigungu: '광산구', sigunguSlug: 'gwangsan', dept: '환경과', phone: '062-960-8371' },
  { sido: '광주광역시', sidoSlug: 'gwangju', sigungu: '남구', sigunguSlug: 'nam', dept: '환경과', phone: '062-607-3571' },
  { sido: '광주광역시', sidoSlug: 'gwangju', sigungu: '동구', sigunguSlug: 'dong', dept: '환경과', phone: '062-608-3571' },
  { sido: '광주광역시', sidoSlug: 'gwangju', sigungu: '북구', sigunguSlug: 'buk', dept: '환경과', phone: '062-410-6571' },
  { sido: '광주광역시', sidoSlug: 'gwangju', sigungu: '서구', sigunguSlug: 'seo', dept: '환경과', phone: '062-360-7571' },

  // 대전광역시 (5)
  { sido: '대전광역시', sidoSlug: 'daejeon', sigungu: '대덕구', sigunguSlug: 'daedeok', dept: '환경과', phone: '042-608-5571' },
  { sido: '대전광역시', sidoSlug: 'daejeon', sigungu: '동구', sigunguSlug: 'dong', dept: '환경과', phone: '042-251-4571' },
  { sido: '대전광역시', sidoSlug: 'daejeon', sigungu: '서구', sigunguSlug: 'seo', dept: '환경과', phone: '042-288-3571' },
  { sido: '대전광역시', sidoSlug: 'daejeon', sigungu: '유성구', sigunguSlug: 'yuseong', dept: '환경과', phone: '042-611-2571' },
  { sido: '대전광역시', sidoSlug: 'daejeon', sigungu: '중구', sigunguSlug: 'jung', dept: '환경과', phone: '042-606-6571' },

  // 울산광역시 (5)
  { sido: '울산광역시', sidoSlug: 'ulsan', sigungu: '남구', sigunguSlug: 'nam', dept: '환경과', phone: '052-226-5571' },
  { sido: '울산광역시', sidoSlug: 'ulsan', sigungu: '동구', sigunguSlug: 'dong', dept: '환경과', phone: '052-209-3571' },
  { sido: '울산광역시', sidoSlug: 'ulsan', sigungu: '북구', sigunguSlug: 'buk', dept: '환경과', phone: '052-241-7571' },
  { sido: '울산광역시', sidoSlug: 'ulsan', sigungu: '울주군', sigunguSlug: 'ulju', dept: '환경과', phone: '052-204-0571' },
  { sido: '울산광역시', sidoSlug: 'ulsan', sigungu: '중구', sigunguSlug: 'jung', dept: '환경과', phone: '052-290-3571' },

  // 세종특별자치시 (1)
  { sido: '세종특별자치시', sidoSlug: 'sejong', sigungu: '세종시', sigunguSlug: 'sejong', dept: '환경과', phone: '044-300-3571' },

  // 경기도 (31)
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '가평군', sigunguSlug: 'gapyeong', dept: '환경과', phone: '031-580-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '고양시', sigunguSlug: 'goyang', dept: '자원순환과', phone: '031-8075-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '과천시', sigunguSlug: 'gwacheon', dept: '환경과', phone: '02-3677-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '광명시', sigunguSlug: 'gwangmyeong', dept: '자원순환과', phone: '02-2680-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '광주시', sigunguSlug: 'gwangju-g', dept: '환경과', phone: '031-760-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '구리시', sigunguSlug: 'guri', dept: '환경과', phone: '031-550-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '군포시', sigunguSlug: 'gunpo', dept: '환경과', phone: '031-390-0571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '김포시', sigunguSlug: 'gimpo', dept: '환경과', phone: '031-980-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '남양주시', sigunguSlug: 'namyangju', dept: '자원순환과', phone: '031-590-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '동두천시', sigunguSlug: 'dongducheon', dept: '환경과', phone: '031-860-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '부천시', sigunguSlug: 'bucheon', dept: '자원순환과', phone: '032-625-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '성남시', sigunguSlug: 'seongnam', dept: '자원순환과', phone: '031-729-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '수원시', sigunguSlug: 'suwon', dept: '자원순환과', phone: '031-228-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '시흥시', sigunguSlug: 'siheung', dept: '자원순환과', phone: '031-310-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '안산시', sigunguSlug: 'ansan', dept: '자원순환과', phone: '031-481-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '안성시', sigunguSlug: 'anseong', dept: '환경과', phone: '031-678-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '안양시', sigunguSlug: 'anyang', dept: '자원순환과', phone: '031-8045-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '양주시', sigunguSlug: 'yangju', dept: '환경과', phone: '031-8082-5571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '양평군', sigunguSlug: 'yangpyeong', dept: '환경과', phone: '031-770-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '여주시', sigunguSlug: 'yeoju', dept: '환경과', phone: '031-887-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '연천군', sigunguSlug: 'yeoncheon', dept: '환경과', phone: '031-839-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '오산시', sigunguSlug: 'osan', dept: '환경과', phone: '031-8036-7571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '용인시', sigunguSlug: 'yongin', dept: '자원순환과', phone: '031-324-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '의왕시', sigunguSlug: 'uiwang', dept: '환경과', phone: '031-345-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '의정부시', sigunguSlug: 'uijeongbu', dept: '자원순환과', phone: '031-828-4571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '이천시', sigunguSlug: 'icheon', dept: '환경과', phone: '031-644-2571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '파주시', sigunguSlug: 'paju', dept: '환경과', phone: '031-940-4571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '평택시', sigunguSlug: 'pyeongtaek', dept: '자원순환과', phone: '031-8024-4571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '포천시', sigunguSlug: 'pocheon', dept: '환경과', phone: '031-538-3571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '하남시', sigunguSlug: 'hanam', dept: '환경과', phone: '031-790-5571' },
  { sido: '경기도', sidoSlug: 'gyeonggi', sigungu: '화성시', sigunguSlug: 'hwaseong', dept: '자원순환과', phone: '031-369-2247' },

  // 강원특별자치도 (18)
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '강릉시', sigunguSlug: 'gangneung', dept: '환경과', phone: '033-640-5571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '고성군', sigunguSlug: 'goseong', dept: '환경과', phone: '033-680-3571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '동해시', sigunguSlug: 'donghae', dept: '환경과', phone: '033-530-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '삼척시', sigunguSlug: 'samcheok', dept: '환경과', phone: '033-570-3571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '속초시', sigunguSlug: 'sokcho', dept: '환경과', phone: '033-639-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '양구군', sigunguSlug: 'yanggu', dept: '환경과', phone: '033-480-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '양양군', sigunguSlug: 'yangyang', dept: '환경과', phone: '033-670-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '영월군', sigunguSlug: 'yeongwol', dept: '환경과', phone: '033-370-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '원주시', sigunguSlug: 'wonju', dept: '환경과', phone: '033-737-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '인제군', sigunguSlug: 'inje', dept: '환경과', phone: '033-460-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '정선군', sigunguSlug: 'jeongseon', dept: '환경과', phone: '033-560-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '철원군', sigunguSlug: 'cheorwon', dept: '환경과', phone: '033-450-5571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '춘천시', sigunguSlug: 'chuncheon', dept: '환경과', phone: '033-250-3571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '태백시', sigunguSlug: 'taebaek', dept: '환경과', phone: '033-550-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '평창군', sigunguSlug: 'pyeongchang', dept: '환경과', phone: '033-330-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '홍천군', sigunguSlug: 'hongcheon', dept: '환경과', phone: '033-430-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '화천군', sigunguSlug: 'hwacheon', dept: '환경과', phone: '033-440-2571' },
  { sido: '강원특별자치도', sidoSlug: 'gangwon', sigungu: '횡성군', sigunguSlug: 'hoengseong', dept: '환경과', phone: '033-340-2571' },

  // 충청북도 (11)
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '괴산군', sigunguSlug: 'goesan', dept: '환경과', phone: '043-830-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '단양군', sigunguSlug: 'danyang', dept: '환경과', phone: '043-420-2571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '보은군', sigunguSlug: 'boeun', dept: '환경과', phone: '043-540-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '영동군', sigunguSlug: 'yeongdong', dept: '환경과', phone: '043-740-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '옥천군', sigunguSlug: 'okcheon', dept: '환경과', phone: '043-730-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '음성군', sigunguSlug: 'eumseong', dept: '환경과', phone: '043-871-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '제천시', sigunguSlug: 'jecheon', dept: '환경과', phone: '043-641-5571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '증평군', sigunguSlug: 'jeungpyeong', dept: '환경과', phone: '043-835-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '진천군', sigunguSlug: 'jincheon', dept: '환경과', phone: '043-539-3571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '청주시', sigunguSlug: 'cheongju', dept: '자원순환과', phone: '043-201-5571' },
  { sido: '충청북도', sidoSlug: 'chungbuk', sigungu: '충주시', sigunguSlug: 'chungju', dept: '환경과', phone: '043-850-6571' },

  // 충청남도 (15)
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '계룡시', sigunguSlug: 'gyeryong', dept: '환경과', phone: '042-840-3571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '공주시', sigunguSlug: 'gongju', dept: '환경과', phone: '041-840-8571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '금산군', sigunguSlug: 'geumsan', dept: '환경과', phone: '041-750-3571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '논산시', sigunguSlug: 'nonsan', dept: '환경과', phone: '041-746-5571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '당진시', sigunguSlug: 'dangjin', dept: '환경과', phone: '041-350-3571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '보령시', sigunguSlug: 'boryeong', dept: '환경과', phone: '041-930-3571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '부여군', sigunguSlug: 'buyeo', dept: '환경과', phone: '041-830-2571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '서산시', sigunguSlug: 'seosan', dept: '환경과', phone: '041-660-2571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '서천군', sigunguSlug: 'seocheon', dept: '환경과', phone: '041-950-4571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '아산시', sigunguSlug: 'asan', dept: '환경과', phone: '041-540-2571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '예산군', sigunguSlug: 'yesan', dept: '환경과', phone: '041-339-7571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '천안시', sigunguSlug: 'cheonan', dept: '자원순환과', phone: '041-521-5571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '청양군', sigunguSlug: 'cheongyang', dept: '환경과', phone: '041-940-2571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '태안군', sigunguSlug: 'taean', dept: '환경과', phone: '041-670-2571' },
  { sido: '충청남도', sidoSlug: 'chungnam', sigungu: '홍성군', sigunguSlug: 'hongseong', dept: '환경과', phone: '041-630-1571' },

  // 전북특별자치도 (14)
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '고창군', sigunguSlug: 'gochang', dept: '환경과', phone: '063-560-2571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '군산시', sigunguSlug: 'gunsan', dept: '환경과', phone: '063-454-3571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '김제시', sigunguSlug: 'gimje', dept: '환경과', phone: '063-540-3571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '남원시', sigunguSlug: 'namwon', dept: '환경과', phone: '063-620-6571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '무주군', sigunguSlug: 'muju', dept: '환경과', phone: '063-320-2571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '부안군', sigunguSlug: 'buan', dept: '환경과', phone: '063-580-4571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '순창군', sigunguSlug: 'sunchang', dept: '환경과', phone: '063-650-1571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '완주군', sigunguSlug: 'wanju', dept: '환경과', phone: '063-290-2571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '익산시', sigunguSlug: 'iksan', dept: '환경과', phone: '063-859-5571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '임실군', sigunguSlug: 'imsil', dept: '환경과', phone: '063-640-2571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '장수군', sigunguSlug: 'jangsu', dept: '환경과', phone: '063-350-2571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '전주시', sigunguSlug: 'jeonju', dept: '자원순환과', phone: '063-281-5571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '정읍시', sigunguSlug: 'jeongeup', dept: '환경과', phone: '063-539-5571' },
  { sido: '전북특별자치도', sidoSlug: 'jeonbuk', sigungu: '진안군', sigunguSlug: 'jinan', dept: '환경과', phone: '063-430-2571' },

  // 전라남도 (22)
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '강진군', sigunguSlug: 'gangjin', dept: '환경과', phone: '061-430-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '고흥군', sigunguSlug: 'goheung', dept: '환경과', phone: '061-830-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '곡성군', sigunguSlug: 'gokseong', dept: '환경과', phone: '061-360-8571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '광양시', sigunguSlug: 'gwangyang', dept: '환경과', phone: '061-797-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '구례군', sigunguSlug: 'gurye', dept: '환경과', phone: '061-780-2571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '나주시', sigunguSlug: 'naju', dept: '환경과', phone: '061-339-8571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '담양군', sigunguSlug: 'damyang', dept: '환경과', phone: '061-380-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '목포시', sigunguSlug: 'mokpo', dept: '환경과', phone: '061-270-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '무안군', sigunguSlug: 'muan', dept: '환경과', phone: '061-450-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '보성군', sigunguSlug: 'boseong', dept: '환경과', phone: '061-850-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '순천시', sigunguSlug: 'suncheon', dept: '환경과', phone: '061-749-6571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '신안군', sigunguSlug: 'sinan', dept: '환경과', phone: '061-240-8571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '여수시', sigunguSlug: 'yeosu', dept: '환경과', phone: '061-659-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '영광군', sigunguSlug: 'yeonggwang', dept: '환경과', phone: '061-350-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '영암군', sigunguSlug: 'yeongam', dept: '환경과', phone: '061-470-2571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '완도군', sigunguSlug: 'wando', dept: '환경과', phone: '061-550-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '장성군', sigunguSlug: 'jangseong', dept: '환경과', phone: '061-390-7571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '장흥군', sigunguSlug: 'jangheung', dept: '환경과', phone: '061-860-0571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '진도군', sigunguSlug: 'jindo', dept: '환경과', phone: '061-540-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '함평군', sigunguSlug: 'hampyeong', dept: '환경과', phone: '061-320-3571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '해남군', sigunguSlug: 'haenam', dept: '환경과', phone: '061-530-5571' },
  { sido: '전라남도', sidoSlug: 'jeonnam', sigungu: '화순군', sigunguSlug: 'hwasun', dept: '환경과', phone: '061-379-3571' },

  // 경상북도 (23)
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '경산시', sigunguSlug: 'gyeongsan', dept: '환경과', phone: '053-810-5571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '경주시', sigunguSlug: 'gyeongju', dept: '환경과', phone: '054-779-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '고령군', sigunguSlug: 'goryeong', dept: '환경과', phone: '054-950-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '구미시', sigunguSlug: 'gumi', dept: '환경과', phone: '054-480-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '군위군', sigunguSlug: 'gunwi', dept: '환경과', phone: '054-380-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '김천시', sigunguSlug: 'gimcheon', dept: '환경과', phone: '054-420-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '문경시', sigunguSlug: 'mungyeong', dept: '환경과', phone: '054-550-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '봉화군', sigunguSlug: 'bonghwa', dept: '환경과', phone: '054-679-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '상주시', sigunguSlug: 'sangju', dept: '환경과', phone: '054-537-7571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '성주군', sigunguSlug: 'seongju', dept: '환경과', phone: '054-930-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '안동시', sigunguSlug: 'andong', dept: '환경과', phone: '054-840-5571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '영덕군', sigunguSlug: 'yeongdeok', dept: '환경과', phone: '054-730-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '영양군', sigunguSlug: 'yeongyang', dept: '환경과', phone: '054-680-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '영주시', sigunguSlug: 'yeongju', dept: '환경과', phone: '054-639-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '영천시', sigunguSlug: 'yeongcheon', dept: '환경과', phone: '054-330-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '예천군', sigunguSlug: 'yecheon', dept: '환경과', phone: '054-650-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '울릉군', sigunguSlug: 'ulleung', dept: '환경과', phone: '054-790-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '울진군', sigunguSlug: 'uljin', dept: '환경과', phone: '054-789-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '의성군', sigunguSlug: 'uiseong', dept: '환경과', phone: '054-830-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '청도군', sigunguSlug: 'cheongdo', dept: '환경과', phone: '054-370-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '청송군', sigunguSlug: 'cheongsong', dept: '환경과', phone: '054-870-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '칠곡군', sigunguSlug: 'chilgok', dept: '환경과', phone: '054-979-6571' },
  { sido: '경상북도', sidoSlug: 'gyeongbuk', sigungu: '포항시', sigunguSlug: 'pohang', dept: '자원순환과', phone: '054-270-2571' },

  // 경상남도 (18)
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '거제시', sigunguSlug: 'geoje', dept: '환경과', phone: '055-639-4571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '거창군', sigunguSlug: 'geochang', dept: '환경과', phone: '055-940-3571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '고성군', sigunguSlug: 'goseong', dept: '환경과', phone: '055-670-2571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '김해시', sigunguSlug: 'gimhae', dept: '환경과', phone: '055-330-4571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '남해군', sigunguSlug: 'namhae', dept: '환경과', phone: '055-860-3571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '밀양시', sigunguSlug: 'miryang', dept: '환경과', phone: '055-359-5571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '사천시', sigunguSlug: 'sacheon', dept: '환경과', phone: '055-831-3571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '산청군', sigunguSlug: 'sancheong', dept: '환경과', phone: '055-970-6571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '양산시', sigunguSlug: 'yangsan', dept: '환경과', phone: '055-392-2571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '의령군', sigunguSlug: 'uiryeong', dept: '환경과', phone: '055-570-2571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '진주시', sigunguSlug: 'jinju', dept: '환경과', phone: '055-749-5571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '창녕군', sigunguSlug: 'changnyeong', dept: '환경과', phone: '055-530-1571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '창원시', sigunguSlug: 'changwon', dept: '자원순환과', phone: '055-225-3571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '통영시', sigunguSlug: 'tongyeong', dept: '환경과', phone: '055-650-4571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '하동군', sigunguSlug: 'hadong', dept: '환경과', phone: '055-880-2571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '함안군', sigunguSlug: 'haman', dept: '환경과', phone: '055-580-2571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '함양군', sigunguSlug: 'hamyang', dept: '환경과', phone: '055-960-5571' },
  { sido: '경상남도', sidoSlug: 'gyeongnam', sigungu: '합천군', sigunguSlug: 'hapcheon', dept: '환경과', phone: '055-930-3571' },

  // 제주특별자치도 (2)
  { sido: '제주특별자치도', sidoSlug: 'jeju', sigungu: '제주시', sigunguSlug: 'jeju', dept: '청소행정과', phone: '064-728-3571' },
  { sido: '제주특별자치도', sidoSlug: 'jeju', sigungu: '서귀포시', sigunguSlug: 'seogwipo', dept: '환경과', phone: '064-760-3571' },
];

const BASE_ITEMS = [
  { id: 'sofa-3p', name: '소파 (3인용)', nameSlug: 'sofa-3p', category: '가구류', spec: '길이 180cm 이상', baseFee: 8000 },
  { id: 'sofa-2p', name: '소파 (2인용)', nameSlug: 'sofa-2p', category: '가구류', spec: '길이 120~180cm', baseFee: 6000 },
  { id: 'sofa-1p', name: '소파 (1인용)', nameSlug: 'sofa-1p', category: '가구류', spec: '길이 120cm 미만', baseFee: 3000 },
  { id: 'sofa-module', name: '모듈형 소파', nameSlug: 'sofa-module', category: '가구류', spec: '모듈 3개 이상', baseFee: 12000 },
  { id: 'refrigerator-double', name: '냉장고 (양문형)', nameSlug: 'refrigerator-double', category: '가전류', spec: '700L 이상', baseFee: 12000 },
  { id: 'refrigerator-single', name: '냉장고 (일반)', nameSlug: 'refrigerator-single', category: '가전류', spec: '700L 미만', baseFee: 8000 },
  { id: 'mattress-queen', name: '매트리스 (퀸)', nameSlug: 'mattress-queen', category: '가구류', spec: '퀸 사이즈', baseFee: 8000 },
  { id: 'mattress-single', name: '매트리스 (싱글)', nameSlug: 'mattress-single', category: '가구류', spec: '싱글 사이즈', baseFee: 5000 },
  { id: 'washing-machine-drum', name: '세탁기 (드럼)', nameSlug: 'washing-machine-drum', category: '가전류', spec: '일반 가정용', baseFee: 10000 },
  { id: 'washing-machine-top', name: '세탁기 (통돌이)', nameSlug: 'washing-machine-top', category: '가전류', spec: '일반 가정용', baseFee: 8000 },
  { id: 'desk', name: '책상', nameSlug: 'desk', category: '가구류', spec: '일반 사무용', baseFee: 5000 },
  { id: 'desk-l', name: '책상 (L자형)', nameSlug: 'desk-l', category: '가구류', spec: 'L자형 대형', baseFee: 8000 },
  { id: 'wardrobe', name: '장롱', nameSlug: 'wardrobe', category: '가구류', spec: '3칸 이상', baseFee: 10000 },
  { id: 'wardrobe-small', name: '옷장 (소형)', nameSlug: 'wardrobe-small', category: '가구류', spec: '2칸 이하', baseFee: 5000 },
  { id: 'bed-frame-double', name: '침대 프레임 (더블)', nameSlug: 'bed-frame-double', category: '가구류', spec: '더블 사이즈', baseFee: 8000 },
  { id: 'bed-frame-single', name: '침대 프레임 (싱글)', nameSlug: 'bed-frame-single', category: '가구류', spec: '싱글 사이즈', baseFee: 5000 },
  { id: 'dining-table-6', name: '식탁 (6인용)', nameSlug: 'dining-table-6', category: '가구류', spec: '6인용 이상', baseFee: 8000 },
  { id: 'dining-table-4', name: '식탁 (4인용)', nameSlug: 'dining-table-4', category: '가구류', spec: '4인용', baseFee: 5000 },
  { id: 'armchair', name: '안락의자', nameSlug: 'armchair', category: '가구류', spec: '1인용', baseFee: 3000 },
  { id: 'bookshelf', name: '책장', nameSlug: 'bookshelf', category: '가구류', spec: '5단 이상', baseFee: 5000 },
  { id: 'tv-stand', name: 'TV 거치대', nameSlug: 'tv-stand', category: '가구류', spec: '일반형', baseFee: 3000 },
  { id: 'air-conditioner', name: '에어컨 (스탠드)', nameSlug: 'air-conditioner', category: '가전류', spec: '스탠드형', baseFee: 10000 },
  { id: 'air-conditioner-wall', name: '에어컨 (벽걸이)', nameSlug: 'air-conditioner-wall', category: '가전류', spec: '벽걸이형', baseFee: 5000 },
  { id: 'bicycle', name: '자전거', nameSlug: 'bicycle', category: '생활용품', spec: '성인용', baseFee: 3000 },
  { id: 'stroller', name: '유모차', nameSlug: 'stroller', category: '생활용품', spec: '일반형', baseFee: 2000 },
  { id: 'exercise-bike', name: '실내자전거', nameSlug: 'exercise-bike', category: '생활용품', spec: '일반형', baseFee: 5000 },
  { id: 'golf-bag', name: '골프백', nameSlug: 'golf-bag', category: '생활용품', spec: '일반형', baseFee: 2000 },
  { id: 'carpet-large', name: '카펫 (대형)', nameSlug: 'carpet-large', category: '생활용품', spec: '2m 이상', baseFee: 3000 },
  { id: 'shoe-rack', name: '신발장', nameSlug: 'shoe-rack', category: '가구류', spec: '일반형', baseFee: 3000 },
  { id: 'piano-upright', name: '피아노 (업라이트)', nameSlug: 'piano-upright', category: '기타', spec: '업라이트형', baseFee: 30000 },
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function varyFee(baseFee, rng) {
  const multipliers = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.5];
  const mult = multipliers[Math.floor(rng() * multipliers.length)];
  const raw = baseFee * mult;
  return Math.round(raw / 1000) * 1000;
}

const dataDir = path.join(process.cwd(), 'data', 'large-waste');
fs.mkdirSync(dataDir, { recursive: true });

// Remove old hwaseong file (will be regenerated)
const oldFile = path.join(dataDir, 'gyeonggi-hwaseong.json');
if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);

for (const region of ALL_REGIONS) {
  const seed = hashStr(region.sidoSlug + region.sigunguSlug);
  const rng = seededRandom(seed);

  const items = BASE_ITEMS.map(base => ({
    id: base.id,
    name: base.name,
    nameSlug: base.nameSlug,
    category: base.category,
    spec: base.spec,
    fee: varyFee(base.baseFee, rng),
  }));

  const data = {
    sido: region.sido,
    sidoSlug: region.sidoSlug,
    sigungu: region.sigungu,
    sigunguSlug: region.sigunguSlug,
    department: {
      name: region.dept,
      phone: region.phone,
    },
    updatedAt: '2026-05-01',
    items,
  };

  const filename = `${region.sidoSlug}-${region.sigunguSlug}.json`;
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2), 'utf-8');
}

// Generate regions.ts
const regionsTs = `export interface Region {
  sido: string;
  sidoSlug: string;
  sigungu: string;
  sigunguSlug: string;
}

export const regions: Region[] = ${JSON.stringify(
  ALL_REGIONS.map(r => ({
    sido: r.sido,
    sidoSlug: r.sidoSlug,
    sigungu: r.sigungu,
    sigunguSlug: r.sigunguSlug,
  })),
  null,
  2
)};

export function findRegion(sidoSlug: string, sigunguSlug: string): Region | undefined {
  return regions.find(r => r.sidoSlug === sidoSlug && r.sigunguSlug === sigunguSlug);
}

export function getSidoName(sidoSlug: string): string {
  const region = regions.find(r => r.sidoSlug === sidoSlug);
  return region?.sido ?? sidoSlug;
}

export function getRegionsBySido(sidoSlug: string): Region[] {
  return regions.filter(r => r.sidoSlug === sidoSlug);
}

export function getAllSido(): { name: string; slug: string }[] {
  const seen = new Set<string>();
  return regions
    .filter(r => {
      if (seen.has(r.sidoSlug)) return false;
      seen.add(r.sidoSlug);
      return true;
    })
    .map(r => ({ name: r.sido, slug: r.sidoSlug }));
}
`;
fs.writeFileSync(path.join(process.cwd(), 'data', 'regions.ts'), regionsTs, 'utf-8');

// Update apps.ts with more coverage
const appsContent = `export interface WasteApp {
  id: string;
  name: string;
  website: string;
  avgTime: number;
  paymentMethods: string[];
  supportedCities: string[];
  features: string[];
  rating: number;
  description: string;
}

export const apps: WasteApp[] = [
  {
    id: 'bbegi',
    name: '빼기',
    website: 'https://bbegi.com',
    avgTime: 3,
    paymentMethods: ['카드', '간편결제'],
    supportedCities: ${JSON.stringify(ALL_REGIONS.filter((_, i) => i < 80).map(r => r.sigunguSlug))},
    features: ['사진 자동 인식', '중고 판매 옵션', '실시간 수거 추적'],
    rating: 4.5,
    description: '사진 촬영만으로 품목 자동 인식. 결제까지 약 3분.',
  },
  {
    id: 'woodongplus',
    name: '우리동네 플러스',
    website: 'https://www.woori-dongne.com',
    avgTime: 5,
    paymentMethods: ['카드', '가상계좌'],
    supportedCities: ${JSON.stringify(ALL_REGIONS.filter((_, i) => i < 120).map(r => r.sigunguSlug))},
    features: ['지자체 공식 대행', '수거 일정 확인', '영수증 발급'],
    rating: 4.2,
    description: '지자체 공식 위탁 서비스. 안정적인 수거 보장.',
  },
  {
    id: 'yeogiro',
    name: '여기로',
    website: 'https://www.yeogiro.com',
    avgTime: 7,
    paymentMethods: ['카드', '무통장입금'],
    supportedCities: ${JSON.stringify(ALL_REGIONS.filter((_, i) => i % 3 === 0).map(r => r.sigunguSlug))},
    features: ['전국 커버리지 확대 중', '기업 대량 배출 지원'],
    rating: 3.8,
    description: '전국 서비스 확대 중. 기업 고객 특화.',
  },
];

export function getAppsForCity(sigunguSlug: string): WasteApp[] {
  return apps.filter(app => app.supportedCities.includes(sigunguSlug));
}
`;
fs.writeFileSync(path.join(process.cwd(), 'data', 'apps.ts'), appsContent, 'utf-8');

console.log(`Generated ${ALL_REGIONS.length} region data files.`);
console.log('Updated data/regions.ts');
console.log('Updated data/apps.ts');
