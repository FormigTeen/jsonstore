import Hero from "@/app/components/hero";
import TransitionWrapper from "react-bootstrap/TransitionWrapper";

export default function Home() {
  return (
      <>
          <TransitionWrapper>
              <Hero logoUrl="https://site.gramstore.com.br/wp-content/uploads/2018/09/gramstore-marca-2018-2.png" />
          </TransitionWrapper>
      </>
  );
}
