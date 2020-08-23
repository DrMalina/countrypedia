import React, { FC, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import slugify from 'slugify';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { SkeletonCard } from 'components/SkeletonCard';
import { convertToStartCase, convertValueToLocale } from 'utils';

interface CountryCardProps {
  name: string;
  population: number;
  region: string;
  flag: string;
  capital: string;
}

const useStyles = makeStyles({
  title: {
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  listKey: {
    fontWeight: 500,
  },
  listValue: {
    fontWeight: 300,
    fontStyle: 'italic',
  },
});

export const CountryCard: FC<CountryCardProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { name, flag, ...rest } = props;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 250);

    return () => clearTimeout(timer);
  }, []);

  const classes = useStyles();

  return (
    <>
      {!isVisible ? (
        <SkeletonCard />
      ) : (
        <Link
          underline="none"
          component={RouterLink}
          to={{ pathname: `/${slugify(name, { lower: true })}`, state: name }}
        >
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={`Flag of ${name}`}
                height="160"
                src={flag}
                title={`Flag of ${name}`}
              />
              <CardContent>
                <Typography variant="subtitle1" component="h2" className={classes.title}>
                  {name}
                </Typography>
                <List>
                  {Object.entries(rest).map((element, idx) => (
                    <ListItem disableGutters key={idx}>
                      <Typography variant="body2" component="span" className={classes.listKey}>
                        {convertToStartCase(element[0])}:&nbsp;
                      </Typography>
                      <Typography variant="body2" component="span" className={classes.listValue}>
                        {convertValueToLocale(element[1])}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )}
    </>
  );
};
