import { http, HttpResponse } from "msw";
import { Image, User } from "../data";

const user: User = {
  bio: "Some days you get the bear, and some days the bear gets you. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody.",
  first_name: "Peter",
  id: "9aTMQdp_Djo",
  last_name: "Broomfield",
  location: "Baltimore, MD",
  name: "Peter Broomfield",
  profile_image:
    "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/avatars/warmachine",
  total_collections: 36,
  total_likes: 126,
  total_photos: 1,
  updated_at: "2020-04-20T01:34:56-04:00",
  username: "peterbroomfield",
};

export const handlers = [
  http.get("/images", () => {
    const mockImages: readonly Image[] = [
      {
        alt_description: "white car",
        categories: [],
        color: "#E0E4EF",
        created_at: "2017-04-14T00:59:12-04:00",
        description:
          "I shot this while doing a job for a luxury automotive storage facility in Baltimore, MD. I wanted to create an ominous sense of intrigue, giving the feeling of a space that was both expansive and enclosed. I enjoy the journey my eyes take from the focal point of the headlamps to the contours of the Camero’s body, and then to the backdrop of stacked automobiles.",
        id: "m3m-lnR90uM",
        likes: 995,
        updated_at: "2020-04-14T01:05:34-04:00",
        url: "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/m3m-lnR90uM",
        user,
      },
      {
        alt_description: "orange Lamborghini car",
        categories: [],
        color: "#F58313",
        created_at: "2018-05-06T08:17:17-04:00",
        description: null,
        id: "oUBjd22gF6w",
        likes: 463,
        updated_at: "2020-04-14T01:07:44-04:00",
        url: "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/oUBjd22gF6w",
        user,
      },
      {
        alt_description: "black Mercedes-Benz car",
        categories: [],
        color: "#F8B700",
        created_at: "2017-12-26T14:28:36-05:00",
        description: "Mercedes Benz AMG C63S",
        id: "YApS6TjKJ9c",
        likes: 682,
        updated_at: "2020-04-14T01:02:23-04:00",
        url: "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/YApS6TjKJ9c",
        user,
      },
    ];

    return HttpResponse.json(mockImages);
  }),
];
