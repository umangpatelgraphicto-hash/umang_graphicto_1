"use client";

import TemplateTabPage from "@/components/utils/templatescomponent/templatestab";
import { Suspense } from "react";

function TemplatesPage() {
  return (
    <div>
      
      <Suspense fallback={<div>Loading templates...</div>}>
        <TemplateTabPage />
      </Suspense>
    </div>
  );
}

export default TemplatesPage;
