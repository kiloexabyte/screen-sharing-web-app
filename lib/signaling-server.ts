let API_BASE = "https://screen-sharing-web-app-ebon.vercel.app";

export const setApiBase = (url: string) => {
	API_BASE = url;
};
export { API_BASE };

export const RoomCheck = async (
	username: string,
	roomname: string,
): Promise<Response> => {
	const response = await fetch(
		`${API_BASE}/api/livekit/roomCheck?roomName=${roomname}&username=${username}`,
	);

	return response;
};

export const GenerateTokenForHostRoom = async (
	username: string,
	roomname: string,
): Promise<Response> => {
	const params = new URLSearchParams({
		room: roomname,
		username: username,
	});

	const response = await fetch(
		`${API_BASE}/api/livekit/generateTokenForHostRoom?${params.toString()}`,
		{
			method: "GET",
		},
	);

	return response;
};

export const GenerateTokenForJoinRoom = async (
	username: string,
	roomname: string,
): Promise<Response> => {
	const params = new URLSearchParams({
		room: roomname,
		username: username,
	});

	const response = await fetch(
		`${API_BASE}/api/livekit/generateTokenForJoinRoom?${params.toString()}`,
		{
			method: "GET",
		},
	);

	return response;
};

export const GetUsersInRoom = async (roomname: string): Promise<Response> => {
	const response = await fetch(
		`${API_BASE}/api/livekit/getUsersInRoom?roomName=${roomname}`,
		{
			method: "GET",
		},
	);

	return response;
};
