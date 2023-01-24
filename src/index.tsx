import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./Game";
import {
    ChakraBaseProvider,
    ColorModeScript,
    extendBaseTheme,
} from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const {
    Button: BaseButton,
    Container,
    Divider,
    Drawer,
    Heading,
    Select,
    Stat,
} = chakraTheme.components;

const theme = extendBaseTheme({
    components: {
        Button: {
            ...BaseButton,
            baseStyle: {
                ...BaseButton.baseStyle,
                lineHeight: 0,
            },
            defaultProps: {
                ...BaseButton.defaultProps,
                colorScheme: "teal",
            },
        },
        Container,
        Divider,
        Drawer,
        Heading,
        Select,
        Stat,
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <React.StrictMode>
        <ColorModeScript />
        <ChakraBaseProvider theme={theme}>
            <Game />
        </ChakraBaseProvider>
    </React.StrictMode>,
);
