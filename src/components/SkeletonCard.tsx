import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';

export const SkeletonCard: FC = () => {
  return (
    <Card>
      <div>
        <Skeleton variant="rect" height={160} width="100%" />
        <CardContent>
          <Skeleton height={32} width="80%" />
          <List>
            {Array.from(new Array(3)).map((element, idx) => (
              <ListItem disableGutters key={idx}>
                <Skeleton height={20} width="50%" />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </div>
    </Card>
  );
};
