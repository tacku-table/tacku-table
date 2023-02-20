export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const nickRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

export function cls(...classnames: string[]) {
    return classnames.join(" ");
}
