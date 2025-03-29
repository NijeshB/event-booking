import {
  DataProvider,
  fetchUtils,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  DeleteManyParams,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
} from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL; // ✅ Use Vite env variable
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource: string) => {
    console.log(`API Endpoint = ${apiUrl}/${resource}`);
    const { json } = await httpClient(`${apiUrl}/${resource}`);
    const users = json.data || [];

    return { data: users, total: users.length };
  },

  getOne: async (resource: string, params: GetOneParams) => {
    try {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
      return { data: json.data };
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error("Resource not found"); // Handle 404
      }
      throw new Error("An unexpected error occurred"); // Handle 500 and others
    }
  },

  create: async (resource: string, params: CreateParams) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource: string, params: UpdateParams) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  deleteOne: async (resource: string, params: DeleteParams) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: params.previousData };
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, { method: "DELETE" }),
      ),
    );
    return { data: params.ids };
  },
  delete: async (resource, params) => {
    const { id } = params; // Extract ID
    const { json } = await httpClient(`${apiUrl}/${resource}/${id}`, {
      method: "DELETE",
    });

    return { data: json.data || { id } }; // Ensure React-Admin gets a valid response
  },
  getMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default dataProvider;
