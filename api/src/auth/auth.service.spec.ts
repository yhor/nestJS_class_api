import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

describe('SchoolService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });


  describe('make jwt token', () => {
    it('토큰 생성', async () => { 
      const data = {
        name: '승열',
        role: '학생'
      }
      const result = await service.login(data);
      expect(result).toHaveProperty('access_token')
    });
  });
});
