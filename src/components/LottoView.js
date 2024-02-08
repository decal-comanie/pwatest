import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";

export function LottoView() {
  const imageUrl =
    "https://storage.googleapis.com/rising_storage/images/lottos/";

  const [result, setResult] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [isAnimationStarted, setAnimationStarted] = useState(false);

  const startAnimation = async () => {
    const cardList = generateCardList();
    setShowCards([]);

    setAnimationStarted(true);

    cardList.forEach((card, index) => {
      setTimeout(() => {
        setShowCards((prevShowCards) => [...prevShowCards, card]);
      }, index * 1500);
    });

    setTimeout(() => {
      setShowCards(cardList.sort((a, b) => a - b));
      setAnimationStarted(false);
    }, 9000);
  };

  const generateCardList = () => {
    const lotto = [];
    while (lotto.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!lotto.includes(num)) {
        lotto.push(num);
      }
    }
    return lotto;
  };

  const checkColor = (num) => {
    if (num <= 10) {
      return "yellow";
    } else if (num <= 20) {
      return "blue";
    } else if (num <= 30) {
      return "red";
    } else if (num <= 40) {
      return "gray";
    } else {
      return "green";
    }
  };

  return (
    <Container>
      <Typography variant="h3">Lotto</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", padding: 5 }}>
        <Button variant="contained" onClick={startAnimation}>
          번호 뽑기
        </Button>
      </Box>

      <TransitionGroup>
        <Grid container spacing={2}>
          {showCards.map((card, index) => (
            <Grid item xs={4} sm={2} md={2} key={index}>
              <Grow key={index} in={true} timeout={1500}>
                <Card
                  sx={{
                    width: 100,
                    height: 200,
                    backgroundColor: {
                      yellow: "#f4b942",
                      red: "#ed6a5a",
                      blue: "#0197f6",
                      green: "#3cb371",
                      gray: "#808080",
                    }[checkColor(card)],
                    color: "white",
                  }}
                >
                  <Typography variant="h4" align="center">
                    {card}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{ height: 180 }}
                    image={`${imageUrl}${card}.jpg`}
                  />
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </TransitionGroup>
    </Container>
  );
}
