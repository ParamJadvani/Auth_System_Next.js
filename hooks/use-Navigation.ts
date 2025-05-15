import { useRouter } from "next/navigation";

export default function useNavigation() {
    const router = useRouter();

    const replacePath = (path: string) => {
        router.replace(path);
    };

    const pushPath = (path: string) => {
        router.push(path);
    };

    const goBack = () => {
        router.back();
    };

    return { replacePath, pushPath, goBack };
}
