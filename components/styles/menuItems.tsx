interface LiProps {
    [key: string]: any;
}

export default function MenuItems({ ...rest }: LiProps) {
    return <li {...rest} className=""></li>;
}
