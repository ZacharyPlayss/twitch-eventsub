exports.handler = async (event) => {
    const { headers = [] } = event; 
    
    const type = headers['twitch-eventsub-message-type'] || 'no type';
    const eventType = headers['twitch-eventsub-subscription-type'];



    if (type !== 'notification' || eventType !== 'channel.follow') {
        return { statusCode: 200, body: 'hups-1-2-3'};
    }

    console.log({ headers: event.headers, body: event.body });
    
    //at this point you know you have a valid subscription
    //want to do some magic? Put it here!
    const { event: twitchEvent } = JSON.parse(event.body);
    const user = twitchEvent.user_name;

    return {
        statusCode: 200,
        body: JSON.stringify({
            type,
            message: `${user} is nu een volger!`,
        }),
    };
};