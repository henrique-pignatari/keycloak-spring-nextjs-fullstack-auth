import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, doUseDefaultCss, children } = props;

    const { locale, url, authenticationSession, scripts } = kcContext;

    useEffect(() => {
        document.title = "Login to my app";
    }, []);

    useEffect(() => {
        const { currentLanguageTag } = locale ?? {};

        if (currentLanguageTag === undefined) {
            return;
        }

        const html = document.querySelector("html");
        assert(html !== null);
        html.lang = currentLanguageTag;
    }, []);

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`,
                  `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                  `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                  `${url.resourcesCommonPath}/lib/pficon/pficon.css`,
                  `${url.resourcesPath}/css/login.css`
              ]
    });

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            {
                type: "module",
                src: `${url.resourcesPath}/js/menu-button-links.js`
            },
            ...(authenticationSession === undefined
                ? []
                : [
                      {
                          type: "module",
                          textContent: [
                              `import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";`,
                              ``,
                              `checkCookiesAndSetTimer(`,
                              `  "${authenticationSession.authSessionId}",`,
                              `  "${authenticationSession.tabId}",`,
                              `  "${url.ssoLoginInOtherTabsUrl}"`,
                              `);`
                          ].join("\n")
                      } as const
                  ]),
            ...scripts.map(
                script =>
                    ({
                        type: "text/javascript",
                        src: script
                    }) as const
            )
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    if (!areAllStyleSheetsLoaded) {
        return null;
    }

    return (
        <div id="kc-content">
            <div className="flex flex-row items-center h-screen w-screen" id="kc-content-wrapper">
                <div className="flex flex-1 items-center justify-center w-100% h-screen bg-slate-500">
                    <h1>IMAGEM BACANA VEM AQ</h1>
                </div>
                <div className="min-w-[600px]">{children}</div>
                {/* {socialProvidersNode}
                        {displayInfo && (
                            <div id="kc-info">
                                <div id="kc-info-wrapper">{infoNode}</div>
                            </div>
                        )} */}
            </div>
        </div>
    );
}
