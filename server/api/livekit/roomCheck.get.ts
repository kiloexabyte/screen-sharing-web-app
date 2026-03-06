import { roomExistInLiveKit } from "../../utils/livekit";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const roomName = query.roomName?.toString() || "";
	const username = query.username?.toString() || "";

	// Check if roomName is provided
	if (!roomName) {
		throw createError({
			statusCode: 422,
			statusMessage: "Missing parameter roomName",
		});
	}

	const roomInLK = await roomExistInLiveKit(roomName).catch(() => null);
	if (roomInLK === null) {
		return {
			statusCode: 500,
			message: "Internal server error.",
		};
	}
	if (roomInLK) {
		const taken = await usernameTaken(username, roomName).catch(() => null);
		if (taken === null) {
			return {
				statusCode: 500,
				message: "Internal server error.",
			};
		}
		return {
			statusCode: 200,
			roomExist: true,
			usernameAvailable: !taken,
			message: "Room exist",
		};
	}
	return {
		statusCode: 200,
		roomExist: false,
		message: "Room does not exist.",
	};
});
