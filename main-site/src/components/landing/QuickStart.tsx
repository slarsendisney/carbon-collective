const posts = [
  {
    title: "Create your account",
    description:
      'Register for an account and download our chrome extension.',
  },
  {
    title: "Browse the web",
    description:
      "Visit your favourite sites as normal and we will measure your digital carbon footprint.",
  },
  {
    title: "Enjoy a custom subscription",
    description:
      "We'll create a custom subscription that allows you to support your favorite creators in exchange for ad-free browsing.",
  },
];

export const QuickStart = () => {
  return (
    <div className="pt-16 pb-20  lg:pt-16 lg:pb-16">
      <div className="relative max-w-lg mx-auto lg:max-w-7xl space-y-6">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold sm:text-4xl">
            Getting Started
          </h2>
          <p className="mt-3 text-xlsm:mt-4">
            Follow these steps to get started with CreatorCollective. We will have you
            supporting your favorite creators and enjoying ad-free browsing in no time.
          </p>
        </div>
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {posts.map((post, index) => (
            <div key={post.title}>
              <div>
                <div className="inline-block">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium bg-blue-600 text-white">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="block mt-4">
                <p className="text-xl font-semibold">{post.title}</p>
                <p className="mt-3 text-base ">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
