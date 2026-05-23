const steps = [
  { num: 'Step 1', title: '배출 신고', desc: '홈페이지 또는 신고 앱에서 품목·수량 신고' },
  { num: 'Step 2', title: '수수료 납부', desc: '카드 결제, 가상계좌, 또는 현금 가능' },
  { num: 'Step 3', title: '스티커 부착', desc: '납부 확인번호나 스티커를 잘 보이게' },
  { num: 'Step 4', title: '지정일 배출', desc: '수거 예정일 저녁 지정 장소에 놓기' },
];

export default function StepGrid() {
  return (
    <div className="px-[22px] py-12 text-center bg-apple-white">
      <div className="text-sm font-medium text-apple-text-2 tracking-[-0.01em] mb-3 uppercase">
        배출 절차
      </div>
      <h2 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.1] mb-8">
        간단한 <span className="font-extralight">네 단계.</span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {steps.map(step => (
          <div key={step.num} className="bg-apple-grey rounded-card px-[18px] pt-6 pb-[22px] text-left">
            <div className="text-sm font-semibold text-apple-blue tracking-[-0.01em] mb-3">
              {step.num}
            </div>
            <h4 className="text-lg font-semibold tracking-[-0.02em] leading-[1.2] mb-[5px]">
              {step.title}
            </h4>
            <p className="text-xs text-apple-text-2 leading-[1.45] tracking-[-0.01em]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
