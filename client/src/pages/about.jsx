import React from "react";

const About = () => {
  return (
    <div>
      {/* Logo and name */}
      <div className="mx-1 w-100">
        <div className="flex flex-col mb-2">
          <div className="text-3xl font-semibold mx-auto my-1">Welcome to BlogD</div>
          <div>
            <img
              src="https://res.cloudinary.com/dfuaq9ggj/image/upload/v1697772495/blog/ckov65p4msb127rlsnd0_sjbmvx.png"
              alt=""
              className="mx-auto w-[200px] h-[200px] rounded-full my-1"
            />
          </div>
        </div>

        <div className="text-justify mt-10">
          <div className="text-2xl font-semibold">About BlogD</div>
          <div className="indent-6 my-4">
            At BlogD, we're passionate about all things blogging. Our mission is to provide
            bloggers, both seasoned and novice, with a platform to discover valuable insights, tips,
            and inspiration to elevate their blogging journey.
          </div>

          <div className="indent-6 my-4">
            <p>
              Who We Are: BlogD is a community of writers, creators, and enthusiasts dedicated to
              the world of blogging. We understand that blogging is more than just words on a page;
              it's about sharing ideas, experiences, and knowledge with the world. Whether you're a
              blogger looking for advice on improving your craft or someone considering starting
              their own blog, BlogD is here to guide you every step of the way.
            </p>
          </div>

          <div className="indent-6 my-4">
            <p>
              BlogD is your one-stop destination for all things blogging. We are committed to
              helping you grow as a blogger and providing the tools you need to succeed. Whether
              you're a hobbyist blogger or aspiring to turn your blog into a business, BlogD is here
              to empower you. Join us on this blogging adventure and discover the endless
              possibilities that await. Start your blogging journey with BlogD today!
            </p>
          </div>
        </div>

        <div className="my-w">
          <div className="text-2xl font-semibold">Some Category Popular</div>
          <ul className="list-decimal pl-8 mt-2">
            <li className="mb-2">
              <strong>Sport:</strong> Sport-related content, including news, updates, and
              highlights.
            </li>
            <li className="mb-2">
              <strong>News:</strong> Stay informed with the latest news from around the world.
            </li>
            <li className="mb-2">
              <strong>Anime:</strong> Explore the fascinating world of anime with reviews and
              recommendations.
            </li>
            <li className="mb-2">
              <strong>Technique:</strong> Learn technical skills and tricks in various fields.
            </li>
            <div className="mt-2 font-medium">More category interesting to explore.</div>
          </ul>
        </div>

        <div className="my-4">
          <div className="text-2xl font-semibold">Comment And Feedback</div>
          <div className="index-6 my-4">
            We are pleased to have your participation. Please leave comments, advice or questions
            below each article so we can interact and learn with you. We encourage discussion and
            build a community around the interesting topics we share. Thank you for visiting My
            Lifestyle Blog and hope you find it interesting and useful. Don't hesitate to contact us
            if you have any questions or feedback.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
