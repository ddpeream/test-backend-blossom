import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definimos los atributos que tiene el modelo
interface CharacterAttributes {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definimos los atributos necesarios para crear un nuevo registro (id es obligatorio porque lo traemos de la API)
interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'type' | 'createdAt' | 'updatedAt'> {}

class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public species!: string;
  public type!: string;
  public gender!: string;
  public origin!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // Usaremos los IDs de la API de Rick & Morty
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING, // Guardaremos el nombre del origen
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'characters',
    timestamps: true,
  }
);

export default Character;
