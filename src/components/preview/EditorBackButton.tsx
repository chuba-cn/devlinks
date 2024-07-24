"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function EditorBackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        router.push("/");
      }}
    >
      Back to Editor
    </Button>
  );
}

export default EditorBackButton;
