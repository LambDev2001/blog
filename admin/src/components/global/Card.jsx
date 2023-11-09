import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Card = ({ blog }) => {
  const history = useHistory();

  return (
    <div className="lg:w-1/3 md:w-1/2 sm:w-1 p-2 hover:scale-105">
      <div className="bg-white flex flex-col rounded-xl shadow-md overflow-hidden">
        <img className="w-full h-[180px] object-cover" src={blog.thumbnail} alt="blog Logo" />
        <div className="p-2">
          <h2 className="text-ellipsis overflow-hidden text-xl font-bold mb-2 text-black h-[55px] ">
            {blog.title}
          </h2>
          <p className="text-ellipsis overflow-hidden text-gray-700 text-justify text-md h-[100px]">
            {blog.description}
          </p>
          <div className="mt-4">
            <div
              onClick={() => history.push(`/blog/${blog._id}`)}
              className="text-blue-500 hover:underline cursor-pointer">
              Read more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
