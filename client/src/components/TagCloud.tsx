import { TagCloud as Cloud } from "react-tagcloud";

const data = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "CSS3", count: 20 },
];

export function TagCloud() {
  return (
    <div className="bg-white">
      <Cloud
        minSize={12}
        maxSize={35}
        tags={data}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </div>
  );
}
