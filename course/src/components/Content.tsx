import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  course: CoursePart[];
}

const Content = ({ course }: ContentProps) => {
  return (
    <div>
      {course.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
