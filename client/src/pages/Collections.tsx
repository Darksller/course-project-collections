import { CollectionCard } from "@/components/ui/collection-card";

export function Collections() {
  return (
    //TODO: Карусель по темам
    <div className="mx-auto  my-0 mt-12 max-w-1440">
      <div className=" flex flex-wrap gap-4">
        <CollectionCard />
      </div>
    </div>
  );
}
