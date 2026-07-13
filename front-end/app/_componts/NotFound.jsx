// import componts
import SearchBar from "./SearchBar";

export default function NotFound() {
  return (
    <div className="m-auto absolute z-50 bg-white h-full w-full">
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-4xl">عفواً! لم يتم العثور على اللعبة</h2>
        <p className="text-gray-500 text-xl">
          يرجى التحقق من الاسم الذي أدخلته.
        </p>
        <SearchBar />
      </div>
    </div>
  );
}
