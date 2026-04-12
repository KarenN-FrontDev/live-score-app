import Image from "next/image";
import { HeaderEl } from "./Header.styles";

export default function Header() {
  return (
    <HeaderEl>
      <Image
        src="/assets/images/soccer-ball.svg"
        alt="Ball"
        width={34}
        height={34}
      />
      LIVE SCORES
    </HeaderEl>
  );
}
