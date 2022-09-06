import Identifiable from "./Identifiable";

export default interface Comment extends Identifiable {
    postId: number;
    name: string;
    email: string;
    body: string;
}
