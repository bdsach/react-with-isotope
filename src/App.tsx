import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";

type GridItem = {
  id: number;
  category: string;
  content: string;
};

const items: GridItem[] = [
  { id: 1, category: "category-a", content: "Item A1" },
  { id: 2, category: "category-b", content: "Item B1" },
  { id: 3, category: "category-a", content: "Item A2" },
  { id: 4, category: "category-b", content: "Item B2" },
  { id: 5, category: "category-c", content: "Item C1" },
  { id: 6, category: "category-c", content: "Item C2" },
  { id: 7, category: "category-a", content: "Item A3" },
  { id: 8, category: "category-b", content: "Item B3" },
];

export default function App() {
  const [currentFilter, setCurrentFilter] = useState("*");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isoRef = useRef<Isotope | null>(null);

  const filters = [
    "*",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  useEffect(() => {
    if (gridRef.current) {
      isoRef.current = new Isotope(gridRef.current, {
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
      });
    }

    return () => {
      isoRef.current?.destroy();
    };
  }, []);

  const filterItems = (filter: string) => {
    setCurrentFilter(filter);
    if (isoRef.current) {
      isoRef.current.arrange({ filter: filter === "*" ? "*" : `.${filter}` });
    }
  };

  return (
    <div>
      <div className="filters" style={{ display: "flex", gap: "10px" }}>
        {filters.map((filter) => (
          <button
            key={filter}
            data-filter={currentFilter === filter}
            onClick={() => filterItems(filter)}
          >
            {filter === "*"
              ? "Show All"
              : filter.replace("category-", "Category ")}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`grid-item ${item.category}`}
            style={{
              width: "100px",
              height: "100px",
              padding: "10px",
              border: "1px solid #ccc",
              margin: "5px",
              borderRadius: "5px",
              background: "#f2f2f2",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
