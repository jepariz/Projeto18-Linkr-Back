import urlMetadata from "url-metadata";

export async function addMetadataToPosts(posts) {
  const defaultAsnwer = {
    title: "Não foi possivel encontrar esse link",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39CGp9ylTkfbLNKAaYTIT0930v6E2k3iyTRCewYL4Nw&s",
    description: "Não foi possivel encontrar uma descricao",
  };

  for (let i = 0; i < posts.length; i++) {
    try {
      let { title, image, description } = await urlMetadata(posts[i].link);

      title = title.trim() !== "" ? title : defaultAsnwer.title;
      image = image.trim() !== "" ? image : defaultAsnwer.image;
      description =
        description.trim() !== "" ? description : defaultAsnwer.description;

      posts[i] = { ...posts[i], ...{ title, image, description } };
    } catch (error) {
      posts[i] = {
        ...posts[i],
        ...defaultAsnwer,
      };
    }
  }
  return posts;
}
