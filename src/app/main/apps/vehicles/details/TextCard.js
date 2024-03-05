import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  strong: {
    paddingRight: '14px'
  },
  available: {
    color: 'green'
  },
  unavailable: {
    color: 'red'
  }
}));

function TextCard({ name, isStatus, value }) {
  const classes = useStyles();

  const valueContent = isStatus ? (
    <span className={value === 'Available' ? classes.available : classes.unavailable}>{value}</span>
  ) : (
    value
  );

  return (
    <Typography>
      <strong className={classes.strong}>{name} : </strong> {valueContent}
    </Typography>
  );
}

export default TextCard;
