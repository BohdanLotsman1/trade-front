import { Button, ButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { timeIntervalSelector } from "../store/selectors";
import { useDispatch } from "react-redux";
import { setTimeInterval } from "../store/actions";
import { TimeInterval } from "../store/types";
import { timeframes } from "../../../libs/utils/constants";

export const TimelineButtons = () => {
  const timeInterval = useSelector(timeIntervalSelector);
  const dispatch = useDispatch();

  const handleClick = (timeframe: string) => {
    console.log(timeframe);
    dispatch(setTimeInterval(timeframe.toLowerCase() as TimeInterval) as any);
  };

  return (
    <ButtonGroup
      size="small"
      variant="outlined"
      aria-label="outlined button group"
      sx={{ position: "absolute", top: 8, left: 8, zIndex: 80 }}
      onClick={(e) => handleClick((e.target as HTMLElement).innerText)}
    >
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe}
          sx={{
            borderColor: "#808080",
            color: "#ffffff",
            backgroundColor:
              timeInterval === timeframe ? "#808080" : "transparent",
          }}
        >
          {timeframe}
        </Button>
      ))}
    </ButtonGroup>
  );
};
