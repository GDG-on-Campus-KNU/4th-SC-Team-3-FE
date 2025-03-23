export function AuthInputBox() {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor="birth" className="font-regular text-[14px]">
        생년월일
      </label>
      <input
        type="text"
        className="w-full h-[46px] pl-2 border-b-[2px] border-[#DEDEDE] text-[14px] font-[#94939B] focus:outline-none focus:border-primary-1"
        placeholder="영문, 숫자, 특수문자를 포함해 최소 8자 이상 만들어주세요."
      />
    </div>
  );
}
