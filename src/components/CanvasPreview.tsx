export default function CanvasPreview({ items }: any) {
  return (
    <div className="flex gap-6 justify-center bg-gray-100 p-10 rounded-xl">
      {items.slice(0, 16).map((item: any, i: number) => (
        <div
          key={i}
          className="w-40 h-80 rounded-full flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: item.color }}
        >
          <div className="text-2xl mb-2">⭐</div>
          <h3 className="font-semibold text-white">{item.title}</h3>
          <p className="text-sm text-white opacity-80">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
