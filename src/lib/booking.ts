export interface BookingRequest {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  comment: string;
}

export interface BookingResult {
  mode: "demo";
  acceptedLocally: true;
}

export async function submitBookingRequest(
  request: BookingRequest,
): Promise<BookingResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 550));

  if (!request.name || !request.phone || !request.service) {
    throw new Error("Required booking request fields are missing.");
  }

  return {
    mode: "demo",
    acceptedLocally: true,
  };
}
