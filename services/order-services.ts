const orderServices = {
  tracking: async (code: string) => {
    const res = await fetch(`/api/tracking/${code}`, { method: 'GET' });
    return { status: res.status, data: res.status !== 204 ? await res.json() : undefined };
  },
};
export default orderServices;
