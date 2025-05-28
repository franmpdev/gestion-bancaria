import { Injectable } from '@nestjs/common';
import { User } from 'src/model/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async create(user: User): Promise<boolean> {
    if (!user.dni || user.dni.trim() === '') {
    return true;
  }
    const usuarioRepetido = await this.userRepository.findOneBy({ email: user.email });
    if (usuarioRepetido) {
      return true;
    }
    await this.userRepository.save(user);
    return false;
  }

  async findOne(email: string, password: string): Promise<User | Error> {
    const usuario = await this.userRepository.findOneBy({ email, password });
    if (usuario) {
      return usuario;
    }
    return new Error('Cuenta no encontrada');
  }

  async update(email: string, user: User): Promise<User | Error> {
    const usuario = await this.userRepository.findOneBy({ email });
    if (usuario) {
      const updated = Object.assign(usuario, user);
      await this.userRepository.save(updated);
      return updated;
    } else {
      return new Error('El usuario no existe');
    }
  }
  async updateField(email: string, newProperty: Partial<User>): Promise<User | Error> {
    const usuario = await this.userRepository.findOneBy({ email });
    if (usuario) {
      const updated = Object.assign(usuario, newProperty);
      await this.userRepository.save(updated);
      return updated;
    } else {
      return new Error('El usuario no existe');
    }
  }

  async remove(email: string): Promise<User | Error> {
    const usuario = await this.userRepository.findOneBy({ email });
    if (usuario) {
      await this.userRepository.remove(usuario);
      return usuario;
    }
    return new Error('El usuario no existe');
  }
}
