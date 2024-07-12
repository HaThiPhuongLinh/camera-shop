const BlogPost = () => {
  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-zinc-800 rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="relative py-10 overflow-hidden">
              {/* Blog title and metadata */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-4">Typography</h1>
                <p className="text-gray-500">
                  Published on 21 June 2020 08:04 AM
                </p>
              </div>
              {/* Blog image */}
              <img
                className="block mx-auto mb-8 w-[60%] max-md:w-full"
                src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                alt="Blog Post"
              />
              {/* Blog content */}
              <div className="max-w-5xl mx-auto">
                <p className="text-base text-gray-700 leading-relaxed text-left">
                  {/* Your blog content goes here */}
                  Lid est laborum et dolorum fuga. Et harum quidem rerum facilis
                  est et expeditasi distinctio. Nam libero tempore, cum soluta
                  nobis est eligendi optio cumque nihilse impedit quo minus id
                  quod amets untra dolor amet sad. Sed ut perspser iciatis unde
                  omnis iste natus error sit voluptatem accusantium doloremque
                  laste. Dolores sadips ipsums sits. Nunc tristique velit
                  ligula. Phasellus vel massa a lorem facilisis interdum ut ac
                  erat. Sed convallis a nisi non elementum. Vivamus ac ultricies
                  dolor. Fusce in erat rhoncus, ultrices ante placerat,
                  vulputate odio. Aliquam porta varius enim vitae tempus. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  consectetur augue mauris, in scelerisque mauris dictum nec.
                  Pellentesque a venenatis est. Curabitur ut quam tempus, dictum
                  elit nec, vehicula dui. Nunc vestibulum lorem ac finibus
                  consequat.
                </p>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default BlogPost;
