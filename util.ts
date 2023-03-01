export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
export const convertTimestamp = (writtenDate: any) => {
  let date = writtenDate.toDate();
  let hours = date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" : "";
  minutes = minutes + date.getMinutes();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();
  return (date = `${yyyy}-${mm}-${dd} ${hours}:${minutes}`);
};

export const kakaoInit = () => {
  if (!window.Kakao.isInitialized() && window.Kakao) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }
};
