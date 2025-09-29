"use client";

import { Section, Cell, Image, List } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";
import InputPhone from "@/components/PhoneInput/PhoneInput";
import { shareURL } from "@telegram-apps/sdk-react";

// import { useMask } from '@react-input/mask';

import { openLink } from "@telegram-apps/sdk-react";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import tonSvg from "./_assets/ton.svg";

export default function Home() {
  const t = useTranslations("i18n");

  // const inputRef = useMask({
  //   mask: '+7 000 000 00 00',

  // })

  const text = `const description = "Иззи-бизнес\u00A0— это сообщество молодых предпринимателей\u00A0— пространство, которое вдохновляет на\u00A0старт собственного дела и\u00A0помогает уверенно развивать бизнес. Внутри —\u00A0обмен опытом и\u00A0кейсами, совместный поиск решений в\u00A0сложных ситуациях —\u00A0информация о\u00A0мерах поддержки от\u00A0сбера и\u00A0новых возможностях —\u00A0разнообразные мероприятия: от\u00A0масштабных бизнес-фестов с\u00A0тысячами единомышленников до\u00A0камерных встреч с\u00A0насыщенным нетворкингом —\u00A0а\u00A0еще онлайн конкурсы, подкасты, премия «Молодой предприниматель», обучающие программы и\u00A0акселераторы";`;

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
            {/* <input type="text" ref={inputRef}/> */}
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <InputPhone />
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
            <button onClick={() => shareURL("https://google.com", text)}>
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
