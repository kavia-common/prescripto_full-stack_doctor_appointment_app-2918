import jwt from 'jsonwebtoken';

// Load middlewares
import authUser from '../../../middleware/authUser.js';
import authDoctor from '../../../middleware/authDoctor.js';
import authAdmin from '../../../middleware/authAdmin.js';

const makeRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

const next = jest.fn();

describe('Auth Middlewares', () => {
  const secret = process.env.REACT_APP_JWT_SECRET || 'testsecret';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sign = (payload) => jwt.sign(payload, secret, { expiresIn: '1h' });

  test('authUser allows valid user token', () => {
    const token = sign({ id: 'u1', role: 'user' });
    const req = { headers: { token } };
    const res = makeRes();

    authUser(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.body).toHaveProperty('userId', 'u1');
  });

  test('authDoctor allows valid doctor token', () => {
    const token = sign({ id: 'd1', role: 'doctor' });
    const req = { headers: { token } };
    const res = makeRes();

    authDoctor(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.body).toHaveProperty('doctorId', 'd1');
  });

  test('authAdmin allows valid admin token', () => {
    const token = sign({ id: 'a1', role: 'admin' });
    const req = { headers: { token } };
    const res = makeRes();

    authAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.body).toHaveProperty('adminId', 'a1');
  });

  test('authUser rejects when token missing', () => {
    const req = { headers: {} };
    const res = makeRes();

    authUser(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
  });

  test('authUser rejects with invalid token', () => {
    const req = { headers: { token: 'invalid' } };
    const res = makeRes();

    authUser(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
  });
});
