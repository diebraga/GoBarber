import React from 'react';

import { MdNotifications } from 'react-icons/md';

import { Container, Badge, NotificationList, Notification } from './styles';

export default function Notifications() {
  return (
    <Container>
      <Badge hasUnread>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList>
        <Notification unread>
          <p>You Have a notification</p>
          <time>
            2 days ago
            <button type="button">Read</button>
          </time>
        </Notification>
        <Notification>
          <p>You Have a notification</p>
          <time>
            2 days ago
            <button type="button">Read</button>
          </time>
        </Notification>

        <Notification>
          <p>You Have a notification</p>
          <time>
            2 days ago
            <button type="button">Read</button>
          </time>
        </Notification>
      </NotificationList>
    </Container>
  );
}
