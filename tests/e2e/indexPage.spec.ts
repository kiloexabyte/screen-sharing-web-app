import { test, expect } from "@playwright/test";
import { config } from "./E2eConfig";
import { AssertRoomHosted, UserHostRoom } from "./HelperFunction";

test("Hostroom Tab switch form", async ({ page }) => {
	await page.goto(config.baseURL);

	// Click the "Host Room" tab
	await page.click('a[role="tab"][aria-controls="pv_id_1_1_content"]');

	// Select the button using its aria-label
	const button = page.locator('button[aria-label="Host Room"]');

	// Assert that the button has the aria-label "Host Room"
	await expect(button).toHaveAttribute("aria-label", "Host Room");

	// Optionally, assert that the button is visible
	await expect(button).toBeVisible();
});

test("Host room reroute page to /room", async ({ page }) => {
	const { usernameInput, roomInput } = await UserHostRoom(page);

	await AssertRoomHosted(page, usernameInput, roomInput);
});

test("User can't host room if room name is taken", async ({
	page,
	browser,
}) => {
	const { usernameInput, roomInput } = await UserHostRoom(page);

	await AssertRoomHosted(page, usernameInput, roomInput);

	await page.waitForTimeout(4000);

	// user 2 attempting to host room with the same name and room
	const page2 = await browser.newPage();

	await page2.goto(config.baseURL);

	// click on host room tab
	await page2.click('a[role="tab"][aria-controls="pv_id_1_1_content"]');

	// user fill in info to host room
	await page2.locator("#hostroom-username").fill("user2");
	await page2.locator("#hostroom-room").fill(roomInput);
	await page2.locator('button[aria-label="Host Room"]').click();
	const response2 = await page2.waitForResponse(
		(response) =>
			response.url().includes("/api/livekit/roomCheck") &&
			response.status() === 200,
	);
	expect(response2.status()).toBe(200);

	await page2.waitForTimeout(1000);

	await expect(page2).toHaveURL(config.baseURL);
});

test("User can't join room if username is taken", async ({ page, browser }) => {
	const { usernameInput, roomInput } = await UserHostRoom(page);

	await AssertRoomHosted(page, usernameInput, roomInput);

	await page.waitForTimeout(4000);

	// user 2 attempting to host room with the same name and room
	const page2 = await browser.newPage();

	await page2.goto(config.baseURL);

	// user fill in info to host room
	await page2.locator("#joinroom-username").fill(usernameInput);
	await page2.locator("#joinroom-room").fill(roomInput);
	await page2.locator('button[aria-label="Join Room"]').click();
	const response2 = await page2.waitForResponse(
		(response) =>
			response.url().includes("/api/livekit/roomCheck") &&
			response.status() === 200,
	);
	expect(response2.status()).toBe(200);

	await page2.waitForTimeout(1000);

	await expect(page2).toHaveURL(config.baseURL);
});
