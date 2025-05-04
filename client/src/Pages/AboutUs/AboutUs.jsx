import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('https://portlandrentalhomes.com/wp-content/uploads/2023/12/Skills-1080x675.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Skill-Connect</h1>
        <p className="text-lg">
        At Skill-Connect, we believe that everyone has something valuable to share and something new to learn. Our platform is built to create a community where users can showcase their skills, learn from others, and track their personal growth. Whether it’s coding, cooking, photography, or DIY crafts, we provide an interactive space for users to post skill-sharing content, create structured learning plans, and celebrate their learning milestones. Through social features like following, commenting, and notifications, we encourage meaningful connections and collaboration. Our goal is to make learning accessible, engaging, and inspiring for everyone, helping individuals unlock their full potential through shared knowledge and experiences. </p>
      </div>
    </div>
  );
};

export default AboutUs;
