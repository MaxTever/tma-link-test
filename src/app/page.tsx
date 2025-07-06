"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { openLink } from "@telegram-apps/sdk-react";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "./_assets/ton.svg";

export default function Home() {
  const t = useTranslations("i18n");

  const openPDF = async () => {
    const pdfUrl =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Убраны лишние пробелы
    try {
      // Попробуем открыть напрямую через Telegram WebApp
      if (openLink.isAvailable()) {
        openLink(pdfUrl);
        return;
      }
      // Если SDK недоступен — fallback к window.open()
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.warn("Не удалось открыть PDF:", error);
    }
  };

  return (
    <Page back={false}>
      <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link href="/ton-connect">
            <Cell
              before={
                <Image
                  src={tonSvg.src}
                  style={{ backgroundColor: "#007AFF" }}
                  alt="TON Logo"
                />
              }
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <div
            style={{
              marginLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Link
              href={
                "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              }
              style={{
                backgroundColor: "#007AFF",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Link to pdf (next Link)
            </Link>
            <Link
              href={
                "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              }
              target={"_blank"}
              style={{
                backgroundColor: "green",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Link to pdf (next Link with target)
            </Link>
            <a
              href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              target="_blank"
              style={{
                backgroundColor: "red",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Anchor link with target
            </a>
            <button onClick={openPDF}>
              В виде текста{" "}
              <span style={{ cursor: "pointer" }}>
                <u>ссылка</u>
              </span>
            </button>
          </div>
        </Section>
        <Section header={t("header")} footer={t("footer")}>
          <LocaleSwitcher />
        </Section>
      </List>
    </Page>
  );
}
