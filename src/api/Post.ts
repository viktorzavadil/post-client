import Identifiable from "./Identifiable";

export default interface Post extends Identifiable {
    userId: number;
    title: string;
    body: string;
}
