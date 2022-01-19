const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('cookie-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BCNs12k04MzRCH1Tv30A3OwIIcUAGZTqWoEWjrJ-327arRuK_-9RHmajXDSYpoEueJ9agFEvvTf4nTUl_K6klU8",
    "privateKey": "WK3b8eXOa1Tmi9s8fXX4lvdhESf8PdVOTmLfaGXR5Rk"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/di91jHniK08:APA91bEXceQsMloMpT0ZzXmgLKd4Ms51ag6bYhlZ9bBy1UEGFp198EBUiEmP0L3dVqzGKNRvGIZ6YvPwgENLconNpZGe_BWXKNb_6l-wKPdjzxRPSE4GLY_owRtUsQ2Lnf4odG5Iqwr2',
        keys: {
            auth: 'K-CFbZdCr6AdM0PMlLHbqA',
            p256dh: 'BAg0080xgCA2QS1qrINbQzZIQeKoWWErLsem5nP0fKhcUtWkQyVtyuR1EGPFLhOgcfKIlAx1fVFb1V20lqYWsbQ'
        }
    };

    const payload = {
        "notification": {
            "title": "Push Notification",
            "body": "Body Push Notifii",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});