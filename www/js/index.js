
var app = {
		initialize: function () {
			this.bindEvents();
			var onlineMode;
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function () {
			onlineMode = false
			document.addEventListener('deviceready', this.onDeviceReady, false);
			document.addEventListener('online', this.onOnline, false);
			document.addEventListener('offline', this.onOffline, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function () {
			app.receivedEvent('deviceready');
		},
		// Update DOM on a Received Event
		receivedEvent: function (id) {
			var push = PushNotification.init({
				"android": {
					"senderID": "676072861259"
				},
				"ios": {},
				"windows": {}
			});

			push.on('registration', function (data) {
				if (device.platform == 'android' || device.platform == 'Android') {
					$.get("http://eii.ulpgc.es/app-eii-informa/server-push/registro.php", {
						regId: data.registrationId
					});
				}
			});

			push.on('notification', function (data) {
				// data.message,
				// data.title,
				// data.count,
				// data.sound,
				// data.image,
				// data.additionalData

			});

			push.on('error', function (e) {
				// e.message
			});
		}};
