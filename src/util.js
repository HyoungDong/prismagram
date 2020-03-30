import { nouns, adjectives } from "./words";

export const GenerateSecret = () =>{
    const randomNumber = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
}