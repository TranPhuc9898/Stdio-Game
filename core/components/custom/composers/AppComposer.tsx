/**
 * /* eslint-disable jsx-a11y/alt-text
 *
 * @format
 */

/* eslint-disable @next/next/no-html-link-for-pages */
import {
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoArrowDownCircleSharp,
  IoArrowUpCircleSharp,
  IoTrash,
} from "react-icons/io5";

import { IApp, IArticle, IGenre } from "@stdio/configs/custom-types";
import ImageUploadEditor from "@stdio/core/mui/forms/ImageUploadEditor";
import { useMui } from "@stdio/core/mui/global/MUI";
import { L } from "@stdio/public/locales/langs";

import { AppAPI } from "@stdio/core/apis/AppAPI";
import { getMediaURL } from "@stdio/core/libs/custom-utils";
import UpdateAppFeatureContentDrawer from "./UpdateAppFeatureContentDrawer";

import styles from "./AppComposer.module.scss";

interface IProps {
  initialApp?: IApp;
}

const AppComposer: FC<IProps> = ({ initialApp }) => {
  const { t } = useTranslation("common");
  const { m } = useMui();

  const [genres, setGenres] = useState<IGenre[]>([]);

  const nameRef = useRef<any>(null);
  const slugRef = useRef<any>(null);
  const headlineRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const orderRef = useRef<any>(null);
  const how2UseRef = useRef<any>(null);
  const genreRef = useRef<any>(null);
  const iapRef = useRef<any>(null);
  const articlesRef = useRef<any>(null);

  const priceRef = useRef<any>(null);
  const salePriceRef = useRef<any>(null);

  const microsoftStoreAppIdRef = useRef<any>(null);
  const microsoftStoreAppRef = useRef<any>(null);
  const microsoftStoreWebRef = useRef<any>(null);

  const bannerUploadRef = useRef<any>(null);
  const shareUploadRef = useRef<any>(null);

  const updateAppFeatureContentDrawerRef = useRef<any>(null);

  const [icon, setIcon] = useState("");
  const [banner, setBanner] = useState("");
  const [share, setShare] = useState("");

  const [features, setFeatures] = useState<
    { _id: string; title: string; description: string; screenshot: string }[]
  >([]);

  useEffect(() => {
    setIcon(initialApp?.icon ?? "");
    setBanner(initialApp?.banner ?? "");
    setShare(initialApp?.share ?? "");
    setFeatures(initialApp?.features ?? []);
  }, [initialApp]);

  const save = () => {
    m.confirmDialog.open(
      "Save app info?",
      "",
      () => {
        if (!initialApp?._id) {
          m.message("error", "App id rỗng.");
          return;
        }

        const name = nameRef.current.value.trim();
        const slug = slugRef.current.value.trim();
        const headline = headlineRef.current.value.trim();
        const description = descriptionRef.current.value.trim();
        const order = parseInt(orderRef.current.value);
        const how2Use = how2UseRef.current.value.trim();

        const price = parseFloat(priceRef.current.value);
        const salePrice = parseFloat(salePriceRef.current.value);

        const microsoftStoreAppId = microsoftStoreAppIdRef.current.value.trim();
        const microsoftStoreApp = microsoftStoreAppRef.current.value.trim();
        const microsoftStoreWeb = microsoftStoreWebRef.current.value.trim();

        if (
          name.length < 5 ||
          slug.length < 5 ||
          headline.length < 5 ||
          description.length < 5 ||
          order < 0 ||
          how2Use.length < 0 ||
          price < 0 ||
          salePrice < 0 ||
          microsoftStoreAppId.length < 5 ||
          microsoftStoreApp.length < 5 ||
          microsoftStoreWeb.length < 5
        ) {
          m.message("error", "Dữ liệu bỏ trống nhiều hoặc < 0.");
          return;
        }

        m.loading(true);

        AppAPI.updateContent(initialApp?._id, {
          name,
          slug,
          headline,
          description,
          order,
          how2use: how2Use,
          price,
          salePrice,
          microsoftStore: {
            appId: microsoftStoreAppId,
            app: microsoftStoreApp,
            web: microsoftStoreWeb,
          },
          promotion: ((iapRef?.current?.value ?? "") as string)
            .trim()
            .split("\n")
            .map((a) => a.trim())
            .filter((a) => a),
          articles: ((articlesRef?.current?.value ?? "") as string)
            .trim()
            .split("\n")
            .map((a) => a.trim())
            .filter((a) => a),
        })
          .then((resp) => {
            m.message("success", "Lưu thành công");
          })
          .catch((err) => {
            console.log(err);
            m.message("error", "Lưu thất bại");
          })
          .finally(() => {
            m.loading(false);
          });
      },
      () => {}
    );
  };

  const replaceIcon = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", ".svg");

    input.onchange = function () {
      if (!input.files) return;
      let file = input.files[0];

      m.loading(true);

      AppAPI.uploadIcon(initialApp?._id ?? "", file)
        .then((resp) => {
          setIcon(resp?.data?.icon);
        })
        .catch(() => {})
        .finally(() => m.loading(false));
    };

    input.click();
  };

  const deleteIcon = () => {
    m.confirmDialog.open(
      "Delete app icon?",
      "",
      () => {
        m.loading(true);

        AppAPI.deleteIcon(initialApp?._id ?? "")
          .then((resp) => {
            setIcon("");
          })
          .catch(() => {})
          .finally(() => m.loading(false));
      },
      () => {}
    );
  };

  const replaceBanner = (file: Blob) => {
    m.loading(true);

    AppAPI.uploadBanner(initialApp?._id ?? "", file)
      .then((resp) => {
        setBanner(resp?.data?.banner);
      })
      .catch(() => {})
      .finally(() => m.loading(false));
  };

  const deleteBanner = () => {
    m.confirmDialog.open(
      "Delete app banner?",
      "",
      () => {
        m.loading(true);

        AppAPI.deleteBanner(initialApp?._id ?? "")
          .then((resp) => {
            setBanner("");
          })
          .catch(() => {})
          .finally(() => m.loading(false));
      },
      () => {}
    );
  };

  const replaceShare = (file: Blob) => {
    m.loading(true);

    AppAPI.uploadShare(initialApp?._id ?? "", file)
      .then((resp) => {
        setShare(resp?.data?.share);
      })
      .catch(() => {})
      .finally(() => m.loading(false));
  };

  const deleteShare = () => {
    m.confirmDialog.open(
      "Delete app share?",
      "",
      () => {
        m.loading(true);

        AppAPI.deleteShare(initialApp?._id ?? "")
          .then((resp) => {
            setShare("");
          })
          .catch(() => {})
          .finally(() => m.loading(false));
      },
      () => {}
    );
  };

  const addFeature = () => {
    m.confirmDialog.open(
      "Create app feature?",
      "",
      () => {
        m.loading(true);

        AppAPI.createFeature(initialApp?._id ?? "", {
          title: "",
          description: "",
        })
          .then((resp) => {
            setFeatures(resp?.data?.features ?? []);
          })
          .catch(() => {})
          .finally(() => m.loading(false));
      },
      () => {}
    );
  };

  const deleteFeature = (featureId: string) => {
    m.confirmDialog.open(
      "Delete app feature?",
      "",
      () => {
        m.loading(true);

        AppAPI.deleteFeature(initialApp?._id ?? "", featureId)
          .then((resp) => {
            setFeatures(resp?.data?.features ?? []);
          })
          .catch(() => {})
          .finally(() => m.loading(false));
      },
      () => {}
    );
  };

  const moveFeature = (featureId: string, factor: -1 | 1) => {
    AppAPI.moveFeature(initialApp?._id ?? "", featureId, factor)
      .then((resp) => {
        setFeatures(resp?.data?.features ?? []);
      })
      .catch(() => {})
      .finally(() => m.loading(false));
  };

  const replaceFeatureScreenshot = (index: number) => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", ".png,.jpg");

    input.onchange = function () {
      if (!input.files) return;
      let file = input.files[0];

      m.loading(true);

      const feature = features[index];

      AppAPI.uploadFeatureScreenshot(initialApp?._id ?? "", feature._id, file)
        .then((resp) => {
          setFeatures(resp?.data?.features ?? []);
        })
        .catch(() => {})
        .finally(() => m.loading(false));
    };

    input.click();
  };

  if (!!!initialApp) return null;

  return (
    <>
      <div className={styles.appComposer}>
        <div className={styles.col}>
          <Stack spacing={2}>
            <TextField
              label={t(L.Name)}
              size="small"
              fullWidth
              inputRef={nameRef}
              type="text"
              defaultValue={initialApp?.name ?? ""}
            />
            <TextField
              label={`${t(L.Slug)} (Warning - Affect SEO)`}
              size="small"
              fullWidth
              inputRef={slugRef}
              type="text"
              defaultValue={initialApp?.slug ?? ""}
            />
            <TextField
              label={t(L.Headline)}
              size="small"
              inputRef={headlineRef}
              type="text"
              defaultValue={initialApp?.headline ?? ""}
            />
            <TextField
              label={t(L.Description)}
              multiline
              rows={3}
              inputRef={descriptionRef}
              defaultValue={initialApp?.description ?? ""}
            />
            <TextField
              label={t(L.Order)}
              size="small"
              type="number"
              inputRef={orderRef}
              defaultValue={initialApp?.order ?? 0}
            />
            <TextField
              label={t(L.How2Use)}
              size="small"
              inputRef={how2UseRef}
              defaultValue={initialApp?.how2use ?? ""}
            />
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label={t(L.Price)}
                  size="small"
                  type="number"
                  inputRef={priceRef}
                  defaultValue={initialApp?.price ?? 0}
                />
                <TextField
                  label={t(L.SalePrice)}
                  size="small"
                  type="number"
                  inputRef={salePriceRef}
                  defaultValue={initialApp?.salePrice ?? 0}
                />
              </Stack>
              <fieldset className={styles.fieldset}>
                <legend>Microsoft Store</legend>
                <Stack spacing={2}>
                  <TextField
                    label={t(L.AppId)}
                    size="small"
                    fullWidth
                    inputRef={microsoftStoreAppIdRef}
                    defaultValue={initialApp?.microsoftStore?.appId ?? ""}
                  />
                  <div>
                    <TextField
                      label={t(L.App)}
                      size="small"
                      fullWidth
                      inputRef={microsoftStoreAppRef}
                      defaultValue={initialApp?.microsoftStore?.app ?? ""}
                    />
                    <i style={{ color: "#999" }}>
                      ms-windows-store://pdp/?productid=
                    </i>
                  </div>
                  <div>
                    <TextField
                      label={t(L.Web)}
                      size="small"
                      fullWidth
                      inputRef={microsoftStoreWebRef}
                      defaultValue={initialApp?.microsoftStore?.web ?? ""}
                    />
                    <i style={{ color: "#999" }}>
                      https://apps.microsoft.com/store/detail/stdio/
                    </i>
                  </div>
                </Stack>
              </fieldset>
              <TextField
                label={"MS in App Promotion"}
                multiline
                rows={3}
                size="small"
                fullWidth
                inputRef={iapRef}
                type="text"
                defaultValue={(initialApp?.promotion ?? []).join("\n") ?? ""}
              />
              <TextField
                label={t(L.Articles)}
                multiline
                rows={3}
                size="small"
                fullWidth
                inputRef={articlesRef}
                type="text"
                defaultValue={
                  (initialApp?.articles as IArticle[])
                    ?.map?.((a) => a?._id)
                    ?.join("\n") ?? ""
                }
              />
            </Stack>
            <Button
              variant="contained"
              onClick={save}
              className={styles.saveButton}
            >
              {t(L.Save)}
            </Button>
          </Stack>
        </div>
        <div className={styles.col}>
          <Stack spacing={2}>
            <fieldset className={styles.fieldset}>
              <legend>Icon (SVG 1:1)</legend>
              <img src={getMediaURL(icon)} width="100%" />
              <Stack direction="row" spacing={1}>
                <Button onClick={replaceIcon}>Replace</Button>
                <Button onClick={deleteIcon}>Delete</Button>
              </Stack>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>Banner (1440x425)</legend>
              <img src={getMediaURL(banner)} width="100%" />
              <input type="file" style={{ display: "none" }} />
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={() => {
                    bannerUploadRef.current.open();
                  }}
                >
                  Replace
                </Button>
                <Button onClick={deleteBanner}>Delete</Button>
              </Stack>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>Share (1200x630)</legend>
              <img src={getMediaURL(share)} width="100%" />
              <input type="file" style={{ display: "none" }} />
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={() => {
                    shareUploadRef.current.open();
                  }}
                >
                  Replace
                </Button>
                <Button onClick={deleteShare}>Delete</Button>
              </Stack>
            </fieldset>
          </Stack>
        </div>
        <div className={styles.col}>
          <Stack spacing={2}>
            {features.map((feature, i) => (
              <fieldset className={styles.fieldset} key={i}>
                <Stack spacing={2}>
                  <Stack spacing={1} direction="row">
                    <Button>#{i + 1}</Button>
                    <IconButton
                      onClick={() => {
                        deleteFeature(feature._id);
                      }}
                    >
                      <IoTrash />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        moveFeature(feature._id, -1);
                      }}
                    >
                      <IoArrowUpCircleSharp />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        moveFeature(feature._id, 1);
                      }}
                    >
                      <IoArrowDownCircleSharp />
                    </IconButton>
                  </Stack>
                  <div>
                    <img src={getMediaURL(feature?.screenshot)} width="100%" />
                    <Stack spacing={1} direction="row">
                      <Button
                        onClick={() => {
                          replaceFeatureScreenshot(i);
                        }}
                      >
                        Replace screenshot
                      </Button>
                    </Stack>
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{feature?.title ?? ""}</h3>
                    <p style={{ marginTop: 0 }}>{feature?.description ?? ""}</p>
                    <Stack spacing={1} direction="row">
                      <Button
                        onClick={() => {
                          updateAppFeatureContentDrawerRef.current.open(
                            initialApp?._id ?? "",
                            features,
                            i,
                            (newFeatures: any) => {
                              setFeatures(newFeatures);
                            }
                          );
                        }}
                      >
                        Edit content
                      </Button>
                    </Stack>
                  </div>
                </Stack>
              </fieldset>
            ))}
            <Button onClick={addFeature} variant="contained">
              + Add feature
            </Button>
          </Stack>
        </div>
        <div className={styles.col}>
          <Stack spacing={2}>
            <fieldset className={styles.fieldset}>
              <legend>{t(L.Display)}</legend>
              <Stack>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={initialApp?.isPublished}
                      onChange={(e, checked) => {
                        AppAPI.updateContent(initialApp._id, {
                          isPublished: checked,
                        });
                      }}
                    />
                  }
                  label="Published"
                />
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={initialApp?.isFeatured}
                      onChange={(e, checked) => {
                        AppAPI.updateContent(initialApp._id, {
                          isFeatured: checked,
                        });
                      }}
                    />
                  }
                  label="Featured"
                />
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={initialApp?.isBestSelling}
                      onChange={(e, checked) => {
                        AppAPI.updateContent(initialApp._id, {
                          isBestSelling: checked,
                        });
                      }}
                    />
                  }
                  label="Best seller"
                />
              </Stack>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>{t(L.Quicklinks)}</legend>
              <ul>
                <li>
                  View app:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`/${initialApp?.slug ?? ""}`}
                  >
                    {initialApp?.name ?? ""}
                  </a>{" "}
                  - {initialApp?._id ?? ""}
                </li>
                <li>
                  View:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={initialApp?.how2use ?? ""}
                  >
                    {t(L.How2Use)}
                  </a>
                </li>
                <li>
                  View:{" "}
                  <a target="_blank" rel="noreferrer" href="/apps">
                    /app
                  </a>
                </li>
                <li>
                  View:{" "}
                  <a target="_blank" rel="noreferrer" href="/ms-apps">
                    /ms-apps
                  </a>
                </li>
                <li>
                  App:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={initialApp?.microsoftStore?.web}
                  >
                    on Microsoft Store
                  </a>
                </li>
                <li>
                  STDIO:{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://apps.microsoft.com/store/search?publisher=STDIO%20COMPANY%20LIMITED"
                  >
                    on Microsoft Store
                  </a>
                </li>
              </ul>
            </fieldset>
          </Stack>
        </div>
      </div>
      <ImageUploadEditor
        ref={bannerUploadRef}
        cropWidth={1440}
        cropHeight={425}
        borderRadius={0}
        onUpload={(file) => {
          replaceBanner(file);
        }}
      />
      <ImageUploadEditor
        ref={shareUploadRef}
        cropWidth={1200}
        cropHeight={630}
        borderRadius={0}
        onUpload={(file) => {
          replaceShare(file);
        }}
      />
      <UpdateAppFeatureContentDrawer ref={updateAppFeatureContentDrawerRef} />
    </>
  );
};

export default AppComposer;
