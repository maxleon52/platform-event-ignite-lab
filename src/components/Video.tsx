import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";

import "@vime/core/themes/default.css";
import { gql, useQuery } from "@apollo/client";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonbySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}
interface VideoProps {
  lessonSlug: string;
}
export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    },
  });

  if (!data) {
    return <div className="flex-1">Carregando...</div>;
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[68.75rem] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[68.75rem] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200">{data.lesson.description}</p>

            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt=""
              />

              <div className="leading-relaxed">
                <strong className="block font-bold text-2xl">
                  {data.lesson.teacher.name}
                </strong>
                <span className="block text-sm text-gray-200">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              className="flex items-center gap-2 justify-center p-4 text-sm bg-green-500 rounded font-bold uppercase hover:bg-green-700 transition-all"
              href="#"
            >
              <DiscordLogo size={24} />
              Comunidade do discord
            </a>
            <a
              className="flex items-center gap-2 justify-center p-4 text-sm border border-blue-500 text-blue-500 rounded font-bold uppercase hover:bg-blue-500 hover:text-gray-900 transition-all"
              href="#"
            >
              <Lightning size={24} />
              Acessar desafio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-20">
          <a
            className="flex items-stretch gap-6 bg-gray-700 rounded overflow-hidden hover:bg-gray-600 transition-all"
            href=""
          >
            <div className="flex items-center bg-green-700 h-full p-6">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar seu desenvolvimento
              </p>
            </div>
            <div className="flex items-center h-full p-6">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            className="flex items-stretch gap-6 bg-gray-700 rounded overflow-hidden hover:bg-gray-600 transition-all"
            href=""
          >
            <div className="flex items-center bg-green-700 h-full p-6">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpaper exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe agora nossos wallpapers exclusivos do Ignite Lab
              </p>
            </div>
            <div className="flex items-center h-full p-6">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
