/** @format */

import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import { SITE_URL } from "@stdio/configs/config";
import { IApp, IGenre } from "@stdio/configs/custom-types";
import { AppAPI } from "@stdio/core/apis/AppAPI";
import { GenreAPI } from "@stdio/core/apis/GenreAPI";
import AppItem from "@stdio/core/components/custom/AppItem";
import Banner from "@stdio/core/components/forms/Banner";
import Head from "@stdio/core/layouts/Head";
import MainLayout from "@stdio/core/layouts/main/MainLayout";
import { getMediaURL } from "@stdio/core/libs/custom-utils";

import styles from "./index.module.scss";
import { L } from "@stdio/public/locales/lang";
import { Game } from "@stdio/core/components/2048/Game/Game";

interface IProps {
  apps: IApp[];
}

const Apps: NextPage<IProps> = ({ apps }) => {
  const { t } = useTranslation("common");

  const [genres, setGenres] = useState<IGenre[]>([]);

  return (
    <>
      <Head
        info={{
          page: "main",
          meta: {
            title: t(L.IndexSeoTitle),
            description: t(L.IndexSeoDescription),
          },
        }}
      />
      <MainLayout>
        <div className={styles.apps}>
          <div className={styles.banner}>
            <div className={styles.bannerCenter}>
              <Game />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let props = {};

  let apps: IApp[] = [];

  try {
    apps = (await AppAPI.getApps()).data.filter(
      (a: IApp) => a.isPublished && a.isFeatured
    );
  } catch (err) {
    console.log(err);
  }

  props = {
    apps,
  };

  try {
    if (!!ctx.locale) {
      props = {
        ...props,
        ...(await serverSideTranslations(ctx.locale, ["common"])),
      };
    }

    return {
      props,
    };
  } catch (err) {
    return { props };
  }
};

export default Apps;
